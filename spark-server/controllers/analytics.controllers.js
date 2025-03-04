const Clicks = require("../models/Clicks");
const moment = require("moment");
const DeviceDetector = require("node-device-detector");

exports.saveAnalytics = async (req, res) => {
  try {
    const clicks = new Clicks(req.body);
    const deviceInfo = req.headers["user-agent"];
    clicks.deviceInfo = deviceInfo;
    clicks.save();
    return res.status(200).json({ message: "opened link" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const clicks = await Clicks.find({ userId: req.user._id });

    // Validate and parse dates
    const startDate = moment.utc(req.body.startDate);
    const endDate = moment.utc(req.body.endDate);

    if (!startDate.isValid() || !endDate.isValid()) {
      return res.status(400).json({ error: "Invalid date range provided" });
    }

    // Filter external clicks
    const filteredExternalClicks = clicks.filter(
      (click) => click.viewType === "EXTERNAL"
    );

    // Filter clicks within the date range
    const filteredClicks = filteredExternalClicks.filter((click) => {
      const clickTime = moment.utc(click.createdAt);
      return clickTime.isBetween(startDate, endDate, null, "[]"); // Inclusive
    });

    // Separate clicks based on link type
    const filteredLinkClicks = filteredClicks.filter(
      (click) => click.linkType !== "OT"
    );
    const filteredShopClicks = filteredClicks.filter(
      (click) => click.linkType === "OT"
    );

    const filteredLinkTotalClicks = filteredLinkClicks.length;
    const filteredShopTotalClicks = filteredShopClicks.length;

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize months and counts with all months (default to 0 clicks)
    const clicksPerMonth = allMonths.reduce(
      (acc, month) => {
        acc.months.push(month);
        acc.counts.push(0);
        return acc;
      },
      { months: [], counts: [] }
    );

    // Aggregate clicks per month
    filteredClicks.forEach((click) => {
      const month = moment.utc(click.createdAt).format("MMM"); // "Jan", "Feb", etc.
      const index = allMonths.indexOf(month);
      clicksPerMonth.counts[index] += 1;
    });

    // traffic by device - Linux, Windows, Mac, Android, Other

    const detector = new DeviceDetector({
      clientIndexes: true,
      deviceIndexes: true,
      deviceAliasCode: false,
    });
    const filteredDeviceTraffic = filteredClicks.reduce(
      (acc, click) => {
        const result = detector
          .parseOs(click.deviceInfo /*, clientHintData*/)
        const deviceName = result.name.toLowerCase();
        if (deviceName.includes("linux")) {
          acc.Linux += 1;
        } else if (deviceName.includes("windows")) {
          acc.Windows += 1;
        } else if (deviceName.includes("mac")) {
          acc.Mac += 1;
        } else if (deviceName.includes("android")) {
          acc.Android += 1;
        } else {
          acc.Other += 1;
        }
        return acc;
      },
      { Linux: 0, Windows: 0, Mac: 0, Android: 0, Other: 0 }
    );

    // traffic by link type - YouTube, Facebook, Twitter, Instagram, Others
    const filteredLinkTypeTraffic = filteredClicks.reduce(
      (acc, click) => {
        if (click.linkType === "YT") {
          acc.YouTube += 1;
        } else if (click.linkType === "FB") {
          acc.Facebook += 1;
        } else if (click.linkType === "TW") {
          acc.Twitter += 1;
        } else if (click.linkType === "IN") {
          acc.Instagram += 1;
        } else {
          acc.Others += 1;
        }
        return acc;
      },
      { YouTube: 0, Facebook: 0, Twitter: 0, Instagram: 0, Others: 0 }
    );

    // top 5 most viewed links or shops
    const filteredTop5Links = filteredLinkClicks
      .sort((a, b) => b.allClicks - a.allClicks)
      .slice(0, 5);
    const filteredTop5Shops = filteredShopClicks
      .sort((a, b) => b.allClicks - a.allClicks)
      .slice(0, 5);

    return res.status(200).json({
      linkTotalClicks: filteredLinkTotalClicks,
      shopTotalClicks: filteredShopTotalClicks,
      allClicks: filteredLinkTotalClicks + filteredShopTotalClicks,
      clicksPerMonth: clicksPerMonth,
      deviceTraffic: filteredDeviceTraffic,
      linkTypeTraffic: filteredLinkTypeTraffic,
      top5Links: filteredTop5Links,
      top5Shops: filteredTop5Shops,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
