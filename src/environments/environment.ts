/* eslint-disable max-len */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  b2cPolicies: {
    names: {
      signUpSignIn: 'B2C_1_mlcppdevsignupin'
      //editProfile: 'B2C_1_profileedit'
    },
    authorities: {
      signUpSignIn: {
        authority:
          'https://mlcppdevb2c.b2clogin.com/mlcppdevb2c.onmicrosoft.com/B2C_1_mlcppdevsignupin'
      }
      // editProfile: {
      //   authority: 'https://ryanb2cpoc.b2clogin.com/mlcppdevb2c.onmicrosoft.com/B2C_1_profileedit'
      // }
    },
    authorityDomain: 'mlcppdevb2c.b2clogin.com'
  },
  msalClientId: 'eeaa4948-13ee-4bcd-b524-60856a0d83f5',
  baseUrl: 'https://fa-partnerportal-dev-001.azurewebsites.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
