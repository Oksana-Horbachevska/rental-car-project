import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../_utils/utils';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '12';
    const brand = searchParams.get('brand') || '';
    const rentalPrice = searchParams.get('rentalPrice') || '';
    const minMileage = searchParams.get('minMileage') || '';
    const maxMileage = searchParams.get('maxMileage') || '';

    const res = await api.get('/cars', {
      params: {
        page,
        limit,
        brand: brand || undefined,
        rentalPrice: rentalPrice || undefined,
        minMileage: minMileage || undefined,
        maxMileage: maxMileage || undefined,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
