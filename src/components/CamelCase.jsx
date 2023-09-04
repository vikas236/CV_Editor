function CamelCase(str) {
  str = str.replace(/,\s[1,]/, ", ");
  str = str.replace(/\s[1,]/, " ");
  str = str.split(" ");
  str = str.map((s) => s.charAt(0).toUpperCase() + s.substr(1));
  str = str.join(" ");
  return str;
}

export default CamelCase;
