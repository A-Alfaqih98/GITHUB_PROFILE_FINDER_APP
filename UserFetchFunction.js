const FetchUser = async (forminput, API_KEY) => {
  try {
    const response = await fetch(`https://api.github.com/users/${forminput}`, {
      headers: {
        authorization: `token ${API_KEY}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const FetchUserRepo = async (forminput, API_KEY) => {
  try {
    const param = new URLSearchParams({ sort: 'created', per_page: 10 });
    const response = await fetch(
      `https://api.github.com/users/${forminput}/repos?${param}`,
      {
        headers: {
          authorization: `token ${API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { FetchUser, FetchUserRepo };
