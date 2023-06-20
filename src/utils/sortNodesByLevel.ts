import { IGraph } from "../models/Graph";

const findIndexOfParentNode = (
  graph: IGraph | undefined,
  id: number
): number => {
  if (!graph) return 0;

  const res = [];

  for (const edge of graph.edges) {
    if (id === edge.toId) {
      res.push(edge.fromId);
    }
  }

  return Math.min(...res);
};

export const sortNodesByLevel = (graph: IGraph) => {
  if (!graph) return [];
  const res: number[][] = [];

  const nodeIds = graph.nodes.map((node) => node.id);
  const nodeEndIds = graph.edges.map((edge) => edge.toId);
  // Собираем верхнеуровневые ноды
  const levelOneNodes = nodeIds.filter((id) => !nodeEndIds.includes(id));
  res.push(levelOneNodes);

  // Получаем остальные по уровням для первичной отрисовки
  const getLevelNodes = (upLevelNodeIds: number[]) => {
    const underLevel = nodeIds.filter((id) => {
      for (const edge of graph.edges) {
        if (upLevelNodeIds.includes(edge.fromId) && id === edge.toId) {
          return true;
        }
      }
    });
    const sortedLevel = underLevel.sort((a, b) => {
      if (
        upLevelNodeIds.indexOf(findIndexOfParentNode(graph, b)) <
        upLevelNodeIds.indexOf(findIndexOfParentNode(graph, a))
      )
        return 1;
      if (
        upLevelNodeIds.indexOf(findIndexOfParentNode(graph, b)) >
        upLevelNodeIds.indexOf(findIndexOfParentNode(graph, a))
      )
        return -1;
      return 0;
    });

    res.push(sortedLevel);
    if (res.flat().length < nodeIds.length) {
      getLevelNodes(sortedLevel);
    }
  };

  getLevelNodes(levelOneNodes);

  return res;
};