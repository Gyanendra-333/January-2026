

class circularQueue:
    def __init__(self, size):
        self.size = size
        self.queue = [None] * size
        self.front = -1
        self.rear = -1

    def is_full(self):
        return (self.rear + 1) % self.size == self.front

    def is_empty(self):
        return self.front == -1

    def enqueue(self, item):
        if self.is_full():
            print("Queue is full")
            return
        if self.is_empty():
            self.front = 0
        self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = item
        print(f"Enqueued: {item}")

    def dequeue(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        item = self.queue[self.front]
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        print(f"Dequeued: {item}")
        return item

    def display(self):
        if self.is_empty():
            print("Queue is empty")
            return
        index = self.front
        elements = []
        while True:
            elements.append(self.queue[index])
            if index == self.rear:
                break
            index = (index + 1) % self.size
        print("Queue elements:", elements)

    def peek(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        return self.queue[self.front]
