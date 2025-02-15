export const environment = {
  production: true,
  b2cPolicies: {
    names: {
      signUpSignIn: 'B2C_1_mlcppsignupin',
      editProfile: 'B2C_1_profileedit'
    },
    authorities: {
      signUpSignIn: {
        authority: 'https://mylifecapsuleppb2cau.b2clogin.com/mylifecapsuleppb2cau.onmicrosoft.com/B2C_1_mlcppsignupin'
      },
      editProfile: {
        authority: 'https://mylifecapsuleppb2cau.b2clogin.com/mylifecapsuleppb2cau.onmicrosoft.com/B2C_1_profileedit'
      }
    },
    authorityDomain: 'mylifecapsuleppb2cau.b2clogin.com'
  },
  msalClientId: 'b73326ff-451b-476a-8099-e666a1572072',
  baseUrl: 'https://fa-partnerportal-prd-001-apim.azure-api.net'
};