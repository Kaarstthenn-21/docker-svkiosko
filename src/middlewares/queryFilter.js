
// & =
const userFilter = (req, res, next) => {
  const validated = ['username', 'email'];
  let filter = {}
  for(const propiedad in req.query){
    if(validated.includes(propiedad)){
      filter[propiedad] = req.query[propiedad];
    }
  }
  req.query = filter;
  next();
};

export { userFilter };