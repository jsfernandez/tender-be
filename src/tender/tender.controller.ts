import { Controller, Get, Param, Query } from '@nestjs/common';
import { State } from './consts/options';
import { TenderService } from './tender.service'
@Controller('tender')
export class TenderController {
    constructor(private tenderService: TenderService) { }

    @Get()
    async findAll(@Query() query: any): Promise<any> {
        const { page, count } = query;
        const fullResult = await this.tenderService.getAllActiveTenders();

        if (!page || !count) return fullResult;

        const init = page - 1;
        const from = init * count;
        const until = page * count;
        fullResult.Listado = fullResult.Listado.slice(from, until);
        return fullResult;
    }

    @Get('/state/:condition')
    async findSomeByState(@Param() params: { condition: string }): Promise<any> {
        const tenderStatus = params.condition && State[params.condition.toUpperCase()] !== 'undefined' ? State[params.condition.toUpperCase()] : State.ACTIVES;
        return await this.tenderService.getTendersByState(tenderStatus);
    }

    @Get('/code/:code')
    async findSomeByCode(@Param() params: { code: string }): Promise<any> {
        if (!params.code || params.code === '') return []
        return await this.tenderService.getTendersByCode(params.code);
    }
}
