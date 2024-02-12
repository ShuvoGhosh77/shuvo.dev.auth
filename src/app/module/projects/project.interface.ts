

export type IProject = {
  projectName: string;
  projectType:string;
  liveProjectLink:string;
  projectImageUrl:string; 
  projectDescription:string;
  githubClientLink?:string;
  githubServerLink?:string;
  tag?:string
};



export type IProjectFilters = {
  searchTerm?: string;
  projectName?: string;
  tag?:string
};
