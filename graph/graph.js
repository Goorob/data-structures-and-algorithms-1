'use strict';

const { Queue } = require('../stacksAndQueues/stacks-and-queues.js');

class Vertex {
  constructor(value) {
    this.value = value;
  }
}

class Edge {
  constructor(vertex, weight) {
    this.vertex = vertex;
    this.weight = weight;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = new Map();
    this._size = 0;
  }

  addVertex(value) {
    let vertex = new Vertex(value);
    this.adjacencyList.set(vertex, []);
    this._size++;
    return vertex;
  }

  has(value) {
    let vertices = this.adjacencyList.keys(),
      found = false;
    for (let vertex of vertices) {
      if (vertex.value === value) return found = true;
    }
    return found;
  }

  get(value) {
    let vertices = this.adjacencyList.keys(),
      found = null;
    for (let vertex of vertices) {
      if (vertex.value === value) return found = vertex;
    }
    return found;
  }

  addDirectedEdge(startVertex, endVertex, weight) {
    this.adjacencyList.get(startVertex).push(new Edge(endVertex, weight));
  }

  addUndirectedEdge(startVertex, endVertex, weight) {
    this.addDirectedEdge(startVertex, endVertex, weight);
    this.addDirectedEdge(endVertex, startVertex, weight);
  }

  getVertices() {
    return this._size ? [...this.adjacencyList.keys()] : null;
  }

  getNeighbors(vertex) {
    return [...this.adjacencyList.get(vertex)];
  }

  print() {
    for (const [key, value] of this.adjacencyList) {
      console.log(key, value);
    }
  }

  breadthFirst(startingVertex) {
    let collection = [];
    collection.push(startingVertex);
    let q = new Queue();
    q.enqueue(startingVertex);

    while (q.peek()) {
      let current = q.dequeue();
      let list = this.adjacencyList.get(current.value);

      for (let vertex in list) {
        if (!collection.includes(list[vertex])) {
          collection.push(list[vertex]);
          q.enqueue(list[vertex]);
        }
      }
    }
    return collection;
  }
}

const graph = new Graph();
let a = graph.addVertex('Washington');
let b = graph.addVertex('North Dakota');
let c = graph.addVertex('California');
graph.addUndirectedEdge(a, b, 10);
graph.addUndirectedEdge(b, c, 100);
graph.addUndirectedEdge(a, c, 9);
// a;
// console.log('graph 80', graph);
graph.breadthFirst(a); //?

module.exports = Graph;
