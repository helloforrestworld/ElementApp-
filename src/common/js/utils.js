export function urlParse(search) { // '?aa=bb' => {aa:bb}
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = [];
  let ret = {};
  arr = search.match(reg);
  // ["?id=zhoufang1411"]
  arr.forEach((item) => {
    item = item.substr(1).split('=');
    let key = item[0];
    let value = item[1];
    ret[key] = value;
  });
  return ret;
};
export function saveToLocal(id, key, value) { // 存localStorage
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller.id) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromLocal(id, key, def) { // 读 def为默认值
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  };
  seller = JSON.parse(seller);
  if (!seller[id]) {
    return def;
  };
  return seller[id][key] || def;
}