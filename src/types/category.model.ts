import { IBaseEntity, IDatasourcePageRes } from './base.model';

export interface ICategory extends IBaseEntity {
  faName: string;
  enName: string;
}

export type TCategoryPageRes = IDatasourcePageRes<ICategory>;

export type TCreateOrEditCategoryBody = Pick<ICategory, 'enName' | 'faName'>;
