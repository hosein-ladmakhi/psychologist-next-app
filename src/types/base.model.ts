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

export type TAction<T> = { payload: T };

export type TAdditionalTableAction = {
  text: string;
  color: string;
  onClick: (data: Record<string, any>) => void;
};

export type TSelectOptions = { key: string; value: string | number };

export type THeaderItem = { href: string; label: string };
