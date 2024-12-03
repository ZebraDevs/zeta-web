import core from "@actions/core";
import manifest from "../../../custom-elements.json" assert { type: "json" };

const FILE_KEY = "JesXQFLaPJLc1BdBM4sisI";

const postDevResources = async links => {
  const url = "https://api.figma.com/v1/dev_resources";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      dev_resources: links.map(link => {
        return { name: "Storybook", url: link.storybook, node_id: link.nodeId, file_key: FILE_KEY };
      })
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-FIGMA-TOKEN": core.getInput("figma-access-token")
    }
  });

  console.log(await response.json());
  if (response.status != 200) {
    core.setFailed(response.statusText);
  }
};

const getNodeId = figmaUrl => {
  const paramsStr = figmaUrl.split("?")[1];
  const params = paramsStr.split("&");
  const nodeIdParam = params.find(param => param.split("=")[0] == "node-id");
  const nodeId = nodeIdParam.split("=")[1];
  return nodeId.replace(/-/g, ":").replace(/\%3A/g, ":");
};

const main = () => {
  const links = [];
  manifest.modules.forEach(module => {
    const classDec = module.declarations.find(dec => dec.kind == "class");
    if (classDec?.figma && classDec?.storybook) {
      if (Array.isArray(classDec.figma)) {
        links.push(
          ...classDec.figma.map(figmaLink => {
            return { nodeId: getNodeId(figmaLink.name), storybook: classDec?.storybook.name };
          })
        );
      } else {
        links.push({
          nodeId: getNodeId(classDec.figma.name),
          storybook: classDec?.storybook.name
        });
      }
    } else if (classDec) {
      console.warn(`${classDec.name} is missing documentation links`);
    }
  });
  postDevResources(links);
};

main();
