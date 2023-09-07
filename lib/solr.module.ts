import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SolrModuleAsyncOptions, SolrModuleOptions, SolrOptionsFactory } from './interfaces';
import { SOLR_MODULE_OPTIONS } from './solr.constants';
import { SolrService } from './solr.service';

@Module({
  providers: [SolrService],
  exports: [SolrService],
})
export class SolrModule {
  static register(options: SolrModuleOptions): DynamicModule {
    return {
      module: SolrModule,
      providers: [{ provide: SOLR_MODULE_OPTIONS, useValue: options }],
      exports: [{ provide: SOLR_MODULE_OPTIONS, useValue: options }],
    };
  }

  static registerAsync(options: SolrModuleAsyncOptions): DynamicModule {
    return {
      module: SolrModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
      exports: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: SolrModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: SolrModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SOLR_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SOLR_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SolrOptionsFactory) =>
        await optionsFactory.createSolrOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
