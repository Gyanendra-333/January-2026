# tree tarvesal in python

class Node:
    def __init__(self, value):
        self.left = None
        self.right = None
        self.data = value
        self.left = None
        self.right = None


def print_tree(root):
    if root:
        print_tree(root.left)
        print(root.data)
        print_tree(root.right)


# Driver code
if __name__ == "__main__":
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)

    print_tree(root)
