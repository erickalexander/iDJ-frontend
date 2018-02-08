const unique = (data) => {
  var resArr = [];
  data.filter(function(item){
    var i = resArr.findIndex(x => x.name == item.name);
    if(i <= -1){
      resArr.push({id: item.id, name: item.name});
    }
    return null;
  });
  return resArr
}

export default {
  func : {
    unique
  }
}
