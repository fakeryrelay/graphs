export interface IGraph {
  // Feel free to split these out into separate interfaces if you're using TS
  nodes: {
    id: number; // Unique id of the node
    name: string; // String name of the node which should be displayed
  }[];
  edges: {
    fromId: number; // Id of the node from which the edge starts
    toId: number; // Id of the node to which the edge leads
  }[];
}