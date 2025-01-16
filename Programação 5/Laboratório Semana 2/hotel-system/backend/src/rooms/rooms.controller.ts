import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a room' })
  @ApiResponse({ status: 201, description: 'Room created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
    return this.roomService.createRoom(createRoomDto);
  }

  @Get('id/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({ status: 200, description: 'Return searched room.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  getRoomById(@Param('id') id: string): Promise<RoomResponseDto> {
    return this.roomService.getRoomById(id);
  }

  @Get('hotel/:hotelName')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get rooms by hotel name' })
  @ApiResponse({ status: 200, description: 'Return searched rooms.' })
  @ApiResponse({ status: 404, description: 'Rooms not found.' })
  getRoomsByHotelName(
    @Param('hotelName') hotelName: string,
  ): Promise<RoomResponseDto[]> {
    return this.roomService.getRoomsByHotelName(hotelName);
  }

  @Get(':hotelName/type/:type')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get rooms by type' })
  @ApiResponse({ status: 200, description: 'Return searched rooms.' })
  @ApiResponse({ status: 404, description: 'Rooms not found.' })
  getRoomsByType(
    @Param('hotelName') hotelName: string,
    @Param('type') type: string,
  ): Promise<RoomResponseDto[]> {
    return this.roomService.getRoomsByType(hotelName, type);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a room' })
  @ApiResponse({ status: 200, description: 'Room updated.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomResponseDto> {
    return this.roomService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'Room deleted.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  deleteRoom(@Param('id') id: string): Promise<void> {
    return this.roomService.deleteRoom(id);
  }
}
