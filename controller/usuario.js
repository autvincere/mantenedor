const data = [
  {
    id: 123,
    nombre: "admin",
  },
  {
    id: 124,
    nombre: "tecnico",
  },
];

// Get usuarios
// listar todos los usuarios
const listar = (req, res) => {
  res.json({
    data,
  });
};

// Get Usuario
// localhost:8080/usuario/123
const get = (req, res) => {
  // al obtener el id del params viene en string y el id de la data en number
  // por lo que hay que igualar el tipo de dato
  const idUsuario = +req.params.id;
  console.log(typeof idUsuario);
  res.json({
    data: data.filter((item) => item.id === idUsuario),
  });
};

// Guardar Usuario

const guardar = (req, res) => {
  // const newData = data.concat(req.body)
  const newData = data.push(req.body);
  res.json({
    data: [...data, newData],
  });
};

// const guardar = (req, res) => {
//   // console.log("req.params: ", req.params);
//   console.log("req.body", req.body);
//   // data.push(req.body);
//   res.json({
//     data: [...data, req.body],
//   });
// };

//=====
// Borrar Usuario
//======

const borrar = (req, res) => {
  let idUsuario = +req.params.id;
  console.log(typeof idUsuario);
  res.json({
    data: data.filter((item) => item.id !== idUsuario),
  });
};

module.exports = {
  listar,
  get,
  guardar,
  borrar,
};
