import { Inject, Injectable, Optional } from '@nestjs/common';
import { Client } from 'solr-client';
import { SOLR_MODULE_OPTIONS } from './solr.constants';
import { SolrClientParams } from 'solr-client/dist/lib/types';

@Injectable()
export class SolrService extends Client {
  constructor(
    @Optional() @Inject(SOLR_MODULE_OPTIONS) options: SolrClientParams,
  ) {
    super(options);
  }
}
