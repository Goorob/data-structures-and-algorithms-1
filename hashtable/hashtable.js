'use strict';

// Node class
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Linked list class
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }
  values() {
    let values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}

class Hashtable {
  constructor(size) {
    this.size = size;
    this.map = new Array(size);
  }

  hash(key) {
    // 1. Split key into an array of characters
    // 2. Add (or multiply) all the UTF-16 values together
    // 3. Multiply by a large prime number (like 599)
    // 4. Divide by the total size of the array

    if (typeof key !== 'string') key = key.toString();
    return key.split('').reduce((p, n) => {
      return p + n.charCodeAt(0);
    }, 0) * 599 % this.size;
  }

  add(key, value = key) {
    // hash the key
    let hash = this.hash(key);

    // make a new LL (bucket) if there's no key = hash
    if (!this.map[hash]) {
      this.map[hash] = new LinkedList();
    }

    // put the { key: value } into the bucket
    let entry = { [key]: value };
    this.map[hash].append(entry);
  }

  // helper method to traverse bucket (LL) and return value of a key
  searchBucket(bucket, key) {
    if (typeof key !== 'string') key = key.toString();
    let current = bucket.head;
    while (current) {
      if (Object.keys(current.value)[0] === key) {
        return Object.values(current.value)[0];
      } else {
        current = current.next;
      }
    }
    return null;
  }

  get(key) {
    // hash the key
    let hash = this.hash(key);

    // if the bucket exists, return the value of the key
    // return null if not found
    return this.map[hash] ?
      this.searchBucket(this.map[hash], key) :
      null;
  }

  contains(key) {
    // hash the key
    let hash = this.hash(key);

    // if the bucket exists and the key within that bucket exists
    // return boolean if in table
    return this.map[hash] && this.searchBucket(this.map[hash], key) ?
      true :
      false;
  }

  print() {
    // print the "number" and values of all (LL) buckets
    this.map.forEach((bucket, idx) => {
      console.log(idx, bucket && bucket.values());
    });
  }
}

// let ht = new Hashtable(1024);

// ht.add('billy', 'husband');
// ht.add('brooke', 'wife');
// ht.add('becky', 'sister');
// ht.add('teresa', 'mom');
// ht.add('jim', 'stepdad');
// ht.add('pete', 'uncle');
// ht.add('erin', 'aunt');
// ht.add('june', 'grandma');
// ht.add('mike', 'uncle');

// ht.get('pete'); //?
// ht.contains('teresa'); //?

// ht.print(); //?

module.exports = Hashtable;