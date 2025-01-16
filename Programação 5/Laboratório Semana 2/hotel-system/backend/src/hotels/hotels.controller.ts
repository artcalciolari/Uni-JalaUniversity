import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HotelService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelResponseDto } from './dto/hotel-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a hotel' })
  @ApiResponse({ status: 201, description: 'Hotel created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createHotel(
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<HotelResponseDto> {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiResponse({
    status: 200,
    description: 'Return a list containing all hotels.',
  })
  @ApiResponse({ status: 404, description: 'No hotels found.' })
  getAllHotels(): Promise<HotelResponseDto[]> {
    return this.hotelService.getAllHotels();
  }

  @Get('id/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get hotel by ID' })
  @ApiResponse({ status: 200, description: 'Return searched hotel.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  getHotelById(@Param('id') id: string): Promise<HotelResponseDto> {
    return this.hotelService.getHotelById(id);
  }

  @Get('name/:name')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get hotel by name' })
  @ApiResponse({ status: 200, description: 'Return searched hotel.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  getHotelByName(@Param('name') name: string): Promise<HotelResponseDto> {
    return this.hotelService.getHotelByName(name);
  }

  @Get('location/:location')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get hotels by location' })
  @ApiResponse({
    status: 200,
    description: 'Return a list with all of the hotels in that location.',
  })
  @ApiResponse({ status: 404, description: 'No hotels found.' })
  getHotelsByLocation(
    @Param('location') location: string,
  ): Promise<HotelResponseDto[]> {
    return this.hotelService.getHotelsByLocation(location);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a hotel by ID' })
  @ApiResponse({ status: 200, description: 'Hotel updated.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<HotelResponseDto> {
    return this.hotelService.updateHotel(id, updateHotelDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a hotel by ID' })
  @ApiResponse({ status: 200, description: 'Hotel deleted.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  deleteHotel(@Param('id') id: string): Promise<void> {
    return this.hotelService.deleteHotel(id);
  }
}
