import {Tree, names, generateFiles} from '@nrwl/devkit'
import {join} from 'path'

interface Schema {
  name: string
  directory: string
}

export default async function (tree: Tree, schema: Schema) {
  generateFiles(tree, join(__dirname, 'files'), schema.directory, {
    ...names(schema.name),
    tmpl: '',
  })
}
