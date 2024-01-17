export interface IBaseEntity {
  id: number;
}

export interface IBaseUser {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IDatasourcePageRes<IEntity> {
  content: IEntity[];
  count: number;
}

export interface INextPage<IParams, ISearchParams = {}> {
  params: IParams;
  searchParams: ISearchParams;
}
