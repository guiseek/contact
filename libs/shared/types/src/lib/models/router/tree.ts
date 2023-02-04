interface TreeNode<T> {
  value: T
  children: TreeNode<T>[]
  new (value: T, children: TreeNode<T>[]): this
  toString(): string
}

export abstract class Tree<T> {
  constructor(root: TreeNode<T>) {
    //
  }
  abstract get root(): T
}
