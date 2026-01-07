

class Node:

    def __init__(self, info, next=None):
        self.info = info
        self.next = next


class LinkedList:
    def __init__(self, head=None):
        self.head = head

    def insert_at_beginning(self, info):
        new_node = Node(info, self.head)
        self.head = new_node

    def insert_at_end(self, info):
        new_node = Node(info)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def delete_node(self, key):
        current = self.head
        previous = None

        while current and current.info != key:
            previous = current
            current = current.next

        if not current:
            return  # Key not found

        if previous:
            previous.next = current.next
        else:
            self.head = current.next

    def display(self):
        current = self.head
        elements = []
        while current:
            elements.append(current.info)
            current = current.next
        print(" -> ".join(map(str, elements)))


def delete_value(self, key):
    temp = self.head

    if temp and temp.data == key:
        self.head = temp.next
        return

    prev = None
    while temp and temp.data != key:
        prev = temp
        temp = temp.next

    if temp is None:
        print("Value not found")
        return

    prev.next = temp.next
