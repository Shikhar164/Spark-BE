const z = require("zod");

const passwordCheck = () => {
  return z
    .string()
    .nonempty({
      message: "Please enter your password*",
    })
    .min(8, {
      message: "The password must be at least 8 characters long*",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message:
        "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)",
    });
};

const loginPasswordCheck = () => {
  return z
    .string()
    .nonempty({
      message: "Please enter your password*",
    })
};

const validateUser = (user) => {
  return z.object({
    firstName: z.string().nonempty({
      message: "First name required*",
    }),
    lastName: z.string().nonempty({
      message: "Last name required*",
    }),
    email: z.string().email({
      message: "Invalid Email*",
    }),
    password: passwordCheck()
  }).parse(user);
};

const validateLoginUser = (user) => {
  return z.object({
    usernameOrEmail: z.string().nonempty({
      message: "Please enter your username or email*",
    }),
    password: loginPasswordCheck()
  }).parse(user);
};

const validateUserPreferences = (userPreferences) => {
  return z.object({
    themeStyle: z.string().nonempty({
      message: "Please select a theme style*",
    }),
    fontInfo: z.object({
      fontType: z.string().nonempty({
        message: "Please select a font type*",
      }),
      color: z.string().nonempty({
        message: "Please select a font color*",
      }),
    }),
    userTheme: z.object({
      bannerColor: z.string().nonempty({
        message: "Please select a banner color*",
      }),
      layoutType: z.string().nonempty({
        message: "Please select a layout type*",
      }),
      button: z.object({
        fill: z.string().nonempty({
          message: "Please select a button fill*",
        }),
        outline: z.string().nonempty({
          message: "Please select a button outline*",
        }),
        hardShadow: z.string().nonempty({
          message: "Please select a button hard shadow*",
        }),
        softShadow: z.string().nonempty({
          message: "Please select a button soft shadow*",
        }),
        special: z.string().nonempty({
          message: "Please select a button special*",
        }),
        color: z.string().nonempty({
          message: "Please select a button color*",
        }),
        fontColor: z.string().nonempty({
          message: "Please select a button font color*",
        }),
      }),
    })
  }).parse(userPreferences);
};

module.exports = { validateUser, validateLoginUser, loginPasswordCheck, passwordCheck, validateUserPreferences };