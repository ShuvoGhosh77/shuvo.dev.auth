export const projectSearchableFields = [
  'projectName',
  'projectType',
  'tag'

];

export const projectFilterableFields = [
  'searchTerm',
  'projectName',
  'projectType',
  'tag'
];



export const projectRelationalFields: string[] = [
  'projectType',
  'tag'
];

export const projectRelationalFieldsMapper: { [key: string]: string } = {
  projectType:'projectType',
  tag: 'tag'
};
