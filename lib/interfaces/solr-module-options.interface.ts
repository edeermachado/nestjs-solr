import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { SolrClientParams } from 'solr-client/dist/lib/types';

export type SolrModuleOptions = SolrClientParams;

export interface SolrOptionsFactory {
  createSolrOptions(): Promise<SolrModuleOptions> | SolrModuleOptions;
}

export interface SolrModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SolrOptionsFactory>;
  useClass?: Type<SolrOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<SolrModuleOptions> | SolrModuleOptions;
  inject?: any[];
}
