import { NextResponse } from 'next/server';

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }

  toResponse() {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: this.message,
          code: this.code
        }
      },
      { status: this.status }
    );
  }
}
