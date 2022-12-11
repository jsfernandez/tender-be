import { Injectable } from '@nestjs/common';
import { State } from './consts/options';
import { HttpService } from '@nestjs/axios';
import { TICKETS } from './consts/tickets';
import { getRandomInt } from 'src/shared/utils/math.utils';

@Injectable()
export class TenderService {
  constructor(private httpService: HttpService) {}

  baseUrl: string = process.env.MERCADOPUBLICO_CL_BASE_URL || '';
  defaultCondition: string = State.ACTIVES;

  getTicket(): string {
    const index = getRandomInt(TICKETS.length);
    return `?ticket=${TICKETS[index]}`;
  }

  async getAllActiveTenders(): Promise<any> {
    try {
      const url = `${this.baseUrl}${this.getTicket()}${this.defaultCondition}`;
      const response = await this.httpService.axiosRef.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getTendersByState(tenderState: string): Promise<any> {
    try {
      const url = `${this.baseUrl}${this.getTicket()}${tenderState}`;
      const response = await this.httpService.axiosRef.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getTendersByCode(tenderCode: string): Promise<any> {
    try {
      const url = `${this.baseUrl}${this.getTicket()}&codigo=${tenderCode}`;
      const response = await this.httpService.axiosRef.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
