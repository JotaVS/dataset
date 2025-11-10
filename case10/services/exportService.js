const userRepository = require("../repositories/userRepository");

function exportUserData(userId, format) {
  const user = userRepository.getUserWithRelations(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const exportData = JSON.stringify(user, null, 2);

  return exportData;
}

function exportOrganizationData(orgId) {
  const organization = userRepository.getOrganizationWithMembers(orgId);

  if (!organization) {
    throw new Error("Organization not found");
  }

  const exportData = JSON.stringify(organization, null, 2);

  return exportData;
}

function exportUserActivity(userId) {
  const activity = userRepository.getUserActivity(userId);

  return JSON.stringify(activity, null, 2);
}

module.exports = {
  exportUserData,
  exportOrganizationData,
  exportUserActivity,
};
