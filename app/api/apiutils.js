export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export async function getGameDataByID(url, id) {
  const response = await getData(`${url}/${id}`);
  return isResponseOk(response) ? normalizeDataObject(response) : false;
}

export async function getGamesDataByCategory(url, category) {
  const response = await getData(`${url}?categories.name=${category}`);
  return isResponseOk(response) ? normalizeData(response) : false;
}

export const normalizeDataObject = (obj) => {
  return {
    ...obj,
    category: obj.categories,
    users: obj.users_permissions_users,
  };
};

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};

export async function authorize(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      throw new Error("Ошибка авторизации");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getMe(url, jwt) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export const setJWT = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
  return localStorage.getItem("jwt");
};

export const removeJWT = () => {
  localStorage.removeItem("jwt");
};

export const checkIfUserVoted = (game, userId) => {
  const result = game.users.find((user) => user.id === userId);
  return result;
};

export async function vote(url, jwt, usersArray) {
  try {
    const response = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users_permissions_users: usersArray }),
    });

    if (response.status !== 200) {
      throw new Error("Ошибка голосования");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
