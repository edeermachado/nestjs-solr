import { Inject, Injectable, Optional } from '@nestjs/common';
import { Client, SolrClientParams } from 'solr-client';
import { SOLR_MODULE_OPTIONS } from './solr.constants';

@Injectable()
export class SolrService extends Client {
  constructor(
    @Optional() @Inject(SOLR_MODULE_OPTIONS) options: SolrClientParams,
  )
  {
    super(options);
  }
}
