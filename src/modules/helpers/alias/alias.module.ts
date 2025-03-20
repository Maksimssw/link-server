import { Module } from '@nestjs/common';
import { AliasService } from './alias.service';

@Module({
  providers: [AliasService],
  exports: [AliasService],
})
export class AliasModule {}
