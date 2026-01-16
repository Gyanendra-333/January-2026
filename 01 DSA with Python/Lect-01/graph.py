

class Node:
    def __init__(self, data):
        self.data = data
        self.adjacent = []

    def add_edge(self, node):
        self.adjacent.append(node)

    def __repr__(self):
        return f"Node({self.data})"


class Graph:
    def __init__(self):
        self.nodes = {}

    def add_node(self, data):
        if data not in self.nodes:
            self.nodes[data] = Node(data)

    def add_edge(self, from_data, to_data):
        if from_data not in self.nodes:
            self.add_node(from_data)
        if to_data not in self.nodes:
            self.add_node(to_data)
        self.nodes[from_data].add_edge(self.nodes[to_data])

    def __repr__(self):
        return f"Graph({list(self.nodes.keys())})"


# Example usage:
if __name__ == "__main__":
    g = Graph()
    g.add_edge(1, 2)
    g.add_edge(1, 3)
    g.add_edge(2, 4)
    print(g)
    for node in g.nodes.values():
        print(f"{node} -> {[adj.data for adj in node.adjacent]}")
