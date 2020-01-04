// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`
// });

// const axios = require("axios");
// const fs = require("fs");
// const path = require(`path`);
// const stringUtils = require("./src/utils/strings.js");

// axios.defaults.baseURL = process.env.GATSBY_API_URL;
// axios.defaults.withCredentials = true;
// if (process.env.API_KEY) {
//   axios.interceptors.request.use(config => {
//     config.params = config.params || {};
//     config.params["apikey"] = process.env.API_KEY;
//     return config;
//   });
// }

// console.log(axios.defaults);

// const createJSONfile = async () => {
//   const canonicalItems = await axios.get("/canonicaldata/items");
//   const canonicalTasks = await axios.get("/canonicaldata/tasks");
//   const [items, tasks] = await Promise.all([canonicalItems, canonicalTasks]);

//   //Add tasks to items
//   items.data.map(item => {
//     const linkedTasks = tasks.data.filter(task =>
//       item.canonicalTaskIds.includes(task.canonicalId)
//     );
//     item.tasks = linkedTasks;
//     return item;
//   });
//   const json = JSON.stringify(items.data);
//   fs.writeFileSync("./src/data/tempdata.json", json, "utf8", err => {
//     if (err) throw err;
//     console.log("JSON has been created.");
//     return;
//   });
// };

// exports.onPreInit = async () => {
//   const confirm = await createJSONfile();
//   return;
// };

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   return graphql(`
//     {
//       allTempdataJson {
//         edges {
//           node {
//             name
//             tasks {
//               name
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.allTempdataJson.edges.forEach(({ node }) => {
//       const itemName = node.name;
//       const handleName = stringUtils.convertToHandle(itemName);
//       createPage({
//         path: `Items/${handleName}/`,
//         component: path.resolve(`./src/templates/Item.js`),
//         context: {
//           name: itemName
//         }
//       });
//       node.tasks.forEach(task => {
//         const taskHandle = stringUtils.convertToHandle(task.name);
//         createPage({
//           path: `/Tasks/${taskHandle}/`,
//           component: path.resolve(`./src/templates/Task.js`),
//           context: {
//             itemName,
//             taskName: task.name,
//             description: task.description
//           }
//         });
//       });
//     });
//   });
// };

// exports.onPostBuild = async () => {
//   //TODO this isn't firing?
//   console.log("on post build function");
//   fs.unlink("./src/data/tempdata.json", err => {
//     if (err) throw err;
//     console.log("Temporary json was deleted.");
//   });
// };
