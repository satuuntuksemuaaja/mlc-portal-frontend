/* eslint-disable max-len */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  b2cPolicies: {
    names: {
      signUpSignIn: 'B2C_1_mlcpppreprod'
      //editProfile: 'B2C_1_profileedit'
    },
    authorities: {
      signUpSignIn: {
        authority:
          'https://mlcpppreprodb2c.b2clogin.com/mlcpppreprodb2c.onmicrosoft.com/B2C_1_mlcpppreprod'
      }
      // editProfile: {
      //   authority: 'https://ryanb2cpoc.b2clogin.com/mlcpppreprodb2c.onmicrosoft.com/B2C_1_profileedit'
      // }
    },
    authorityDomain: 'mlcpppreprodb2c.b2clogin.com'
  },
  msalClientId: '413b2156-cd65-4d78-8aa6-0343ff6b0efb',
  baseUrl: 'https://fa-partnerportal-ppd-001.azurewebsites.net'
};