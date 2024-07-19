const getScriptJson = (data: Object) => {
  return {
    __html: JSON.stringify(data),
  };
};

export default getScriptJson;
