function getUserWithRelations(userId) {
  const user = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
  };

  const manager = {
    id: "456",
    name: "Jane Manager",
    email: "jane@example.com",
  };

  user.manager = manager;
  manager.subordinate = user;

  return user;
}

function getOrganizationWithMembers(orgId) {
  const org = {
    id: orgId,
    name: "Tech Corp",
    members: [],
  };

  const member1 = {
    id: "1",
    name: "Alice",
    organization: org,
  };

  const member2 = {
    id: "2",
    name: "Bob",
    organization: org,
  };

  org.members.push(member1, member2);

  return org;
}

function getUserActivity(userId) {
  const user = {
    id: userId,
    name: "User",
  };

  const activity = {
    user: user,
    actions: [],
  };

  user.recentActivity = activity;

  return activity;
}

module.exports = {
  getUserWithRelations,
  getOrganizationWithMembers,
  getUserActivity,
};
