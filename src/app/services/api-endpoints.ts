const API_ENDPOINTS = {
  checkSystemDown: '/api/system/up',
  getActiveClients: '/api/clients/active',
  getAllClients: '/api/clients',
  me: '/api/me',
  mePhotoUpdate: '/api/me/photo',
  getPhoto: '/api/me/photo.png',
  getOrganisation: '/api/adm/organisation',
  getActivities: '/api/activity',
  addClient: '/api/client',
  updateClient: '/api/client/',
  archiveClient: '/api/client/{id}/archive',
  reinviteClient: '/api/client/{id}/reinvite',
  cancelClient: '/api/client/{id}/cancel',
  restoreClient: '/api/client/{id}/restore',
  orgLogo: '/api/organisation/{key}/logo.png',
  checkOrg: '/api/organisation/',
  getClientMessage: '/api/client/{clientId}/messages/',
  getClientMessagePagination: '/api/client/{clientId}/messages/{pageId}',
  downloadAttachment: '/api/item/attachment/{clientId}/{itemId}/{attachmentId}',
  getMessages: '/api/messages/{clientId}',
  getMessagesByPage: '/api/messages/{clientId}?nextPageAfter={next_page_after}',
  sendMessages: '/api/message/create/{clientId}',
  receivedMessages: `/api/message/shared/{clientId}/{shareId}`
};

export default API_ENDPOINTS;
