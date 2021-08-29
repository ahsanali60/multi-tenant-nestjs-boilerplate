// import {
//   Body,
//   Controller,
//   Get,
//   HttpException,
//   HttpStatus,
//   NotFoundException,
//   Param,
//   Post,
//   Put,
//   Query,
//   Req,
//   Res,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
//   ValidationPipe,
// } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
// import { FileInterceptor } from "@nestjs/platform-express";
// import * as fs from "fs";
// // import { getVideoDurationInSeconds } from "get-video-duration";
// import { diskStorage } from "multer";
// import { createVideoDestinationPath, editFileName } from "src/generalUtils/multerHelpers.utils";
// import { v4 as uuidv4 } from "uuid";
// // import { getThumbnails } from "video-metadata-thumbnails";
// import {
//   ChangeResponseStatus,
//   GetPublicResponseDto,
//   GetResponseDto,
//   ResponseDto,
//   ResponseFilter,
// } from "./dto/response.dto";
// import { ResponsesService } from "./responses.service";
// const AdmZip = require("adm-zip");

// @Controller("responses")
// export class ResponsesController {
//   constructor(private readonly responseService: ResponsesService) { }
//   @Post("/:questionId")
//   @UseInterceptors(
//     FileInterceptor("file", {
//       storage: diskStorage({
//         destination: createVideoDestinationPath,
//         filename: editFileName,
//       }),
//       // fileFilter: videoFileFilter,
//       limits: { fileSize: 500 * 1024 * 1024 },
//     })
//   )
//   async create(
//     @UploadedFile() file: Express.Multer.File,
//     @Req() req,
//     @Body(ValidationPipe) responseDto: ResponseDto,
//     @Param() param
//   ) {
//     let orgId;
//     if (file) {
//       orgId = file.destination.split("/")[2];
//     } else {
//       throw new HttpException("Video file is required", HttpStatus.NOT_FOUND);
//     }
//     console.log(file);
//     //removing extension intentionally
//     // file = { ...file, filename: file.filename.split(".")[0], path: file.path.split(".")[0] };
//     // console.log(file);

//     const findExtension = (file) => file.mimetype.split("/")[1] == "x-matroska" ? "mkv" : file.mimetype.split("/")[1]


//     if (!file.filename.split(".")[1]) {
//       //add extension
//       console.log("Extension Missing");
//       try {
//         fs.renameSync(file.path, file.path + `.${findExtension(file)}`);
//       } catch (e) {
//         console.log(e);
//       }


//       file = {
//         ...file,
//         filename: file.filename + "." + findExtension(file),
//         path: file.path + "." + findExtension(file),
//       };
//     }
//     /* Generating URL of video */
//     const videoUrl = orgId + "/question" + param.questionId + "/" + file.filename;
//     //adding extension to videoUrl if not exist

//     /* Generating thumbnails of video */
//     const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
//     const ffmpeg = require("fluent-ffmpeg");
//     ffmpeg.setFfmpegPath(ffmpegPath);
//     const thumbName = uuidv4();

//     // const thumb = ffmpeg(`./uploads/${videoUrl}`).screenshots({
//     //   timestamps: [1],
//     //   filename: `${thumbName}.png`,
//     //   folder: `uploads/${orgId}/question${param.questionId}`,
//     //   // size: "320x240",
//     // });

//     let thumbnailUrl: any = await (() => {
//       return new Promise((resolve, reject) => {
//         ffmpeg(`./uploads/${videoUrl}`)
//           .seekInput("00:00.000")
//           .output(`uploads/${orgId}/question${param.questionId}/${thumbName}.png`)
//           .outputOptions(
//             "-frames",
//             "1" // Capture just one frame of the video
//           )
//           .on("end", () => {
//             console.log("Screenshot taken");
//             let thumbnailUrl = `${orgId}/question${param.questionId}/${thumbName}.png`;
//             console.log(thumbnailUrl);
//             resolve(thumbnailUrl);
//           })
//           .run();
//       });
//     })();

//     // console.log("--------------HERE---------------");
//     // let videoLength = await getVideoDurationInSeconds(`./uploads/${videoUrl}`);
//     // videoLength = Math.floor(videoLength);
//     // console.log("--------------HERE2---------------");

//     // ffmpeg.ffprobe(`./uploads/${videoUrl}`, function (err, metadata) {
//     //   console.log(err);
//     //   //console.dir(metadata); // all metadata
//     //   console.log(metadata);
//     //   console.log("---------DURATION------------", metadata.format.duration);
//     // });
//     let videoLength = req.body.duration;

//     try {
//       req.body.organizationId = +orgId;
//       responseDto = {
//         ...responseDto,
//         videoUrl,
//         organizationId: +orgId,
//         thumbnailUrl,
//         videoLength,
//         isAccpted: null,
//       };
//       return this.responseService.createNew(responseDto, param.questionId);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   /*downlaod video Api*/
//   @Get("single-video")
//   // @Header("Content-Type", "")
//   getSingleVideo(@Req() req, @Res() res) {
//     try {
//       const fileName = req.query.fileName;
//       console.log(fileName);
//       const path = `./uploads/${fileName}`;
//       if (fs.existsSync(path)) {
//         const file = fs.readFileSync(path);
//         // return res.sendFile(fileName, { root: "./uploads" });

//         res.setHeader(
//           "Content-Disposition",
//           `attachment; filename=${fileName.split("/")[fileName.split("/").length - 1]}`
//         );
//         return res.send(file);
//       } else {
//         throw new NotFoundException("Video Not Found");
//       }

//       // return res.sendFile("willSendthis", willSendthis);
//     } catch (err) {
//       console.log(err);
//       throw new NotFoundException("Failed To Read Video");
//     }
//   }

//   /*Archieve Api*/
//   @Get("get-archive")
//   async getVideoArchieve(@Req() req, @Res() res) {
//     try {
//       const fileNames = JSON.parse(req.query.fileNames);
//       const zip = new AdmZip();
//       for (const fileName of fileNames) {
//         const path = `./uploads/${fileName}`;
//         if (fs.existsSync(path)) {
//           const file = fs.readFileSync(path);
//           zip.addFile(fileName, file);
//         } else {
//           throw new NotFoundException("Video Not Found");
//         }
//       }
//       // var willSendthis = zip.toBuffer();
//       // return res.sendFile("willSendthis", willSendthis);
//       const fileNameUUID = uuidv4();
//       zip.writeZip(`./uploads/${req.body.organizationId}/${fileNameUUID}.zip`);
//       res.download(`./uploads/${req.body.organizationId}/${fileNameUUID}.zip`, `${fileNameUUID}.zip`, function (err) {
//         if (err) {
//           // next(err);
//         } else {
//           // File has been sent
//           if (fs.existsSync(`./uploads/${req.body.organizationId}/${fileNameUUID}.zip`)) {
//             // check to ensure file still exists on file system
//             fs.unlinkSync(`./uploads/${req.body.organizationId}/${fileNameUUID}.zip`);
//             // delete file from server file system after 60 seconds
//           }
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       throw new NotFoundException("Failed To Read Video");
//     }
//   }

//   @Get("get-thumbnail/:orgId/:questionId/:fileName")
//   getFile(@Req() req, @Res() res) {
//     try {
//       if (fs.existsSync(`./uploads/${req.params.orgId}/${req.params.questionId}/${req.params.fileName}`)) {
//         return res.sendFile(req.params.fileName, { root: `./uploads/${req.params.orgId}/${req.params.questionId}` });
//       } else {
//         throw new NotFoundException("Thumbnail Not Found");
//       }
//     } catch (err) {
//       throw new NotFoundException("Failed To Read Thumbnail");
//     }
//   }

//   /*Video Streaming Api*/
//   @Get("get-video/:orgId/:questionId/:fileName")
//   getVideoFile(@Req() req, @Res() res) {
//     try {
//       const path = `./uploads/${req.params.orgId}/${req.params.questionId}/${req.params.fileName}`;
//       if (fs.existsSync(path)) {
//         return res.sendFile(req.params.fileName, { root: `./uploads/${req.params.orgId}/${req.params.questionId}` });
//       } else {
//         throw new NotFoundException("Image Not Found");
//       }
//     } catch (err) {
//       throw new NotFoundException("Failed To Read Image");
//     }
//   }

//   // @Post("/uploadVideo")
//   // @UseGuards(AuthGuard())
//   // @UseInterceptors(
//   //   FileInterceptor("file", {
//   //     storage: diskStorage({
//   //       destination: createVideoDestinationPath,
//   //       filename: editFileName,
//   //     }),
//   //     fileFilter: videoFileFilter,
//   //   })
//   // )
//   // VideoUpload(@UploadedFile() file: Express.Multer.File, @Req() req) {
//   //   console.log(file);
//   //   return this.responseService.uploadVideoFile(file, req);
//   // }

//   @UseGuards(AuthGuard())
//   @Get()
//   getByFilters(@Query(ValidationPipe) responseDto: GetResponseDto) {
//     return this.responseService.getByFilters(responseDto);
//   }

//   @UseGuards(AuthGuard())
//   @Put("/change-status/:responseId")
//   chnageStatus(@Param() param, @Body(ValidationPipe) changeResponseDto: ChangeResponseStatus) {
//     const { responseId } = param;
//     const { isAccepted } = changeResponseDto;
//     return this.responseService.changeStatus(responseId, isAccepted);
//   }

//   @Get("/response-public")
//   getAllPublicResponses(@Query(ValidationPipe) publicResponseDto: GetPublicResponseDto, @Req() req) {
//     return this.responseService.getPublicResponse(publicResponseDto);
//   }

//   @UseGuards(AuthGuard())
//   @Get("all")
//   getAll(@Query(ValidationPipe) responseFilter: ResponseFilter) {
//     const { pageNumber, recordsPerPage } = responseFilter;
//     return this.responseService.getAll(pageNumber, recordsPerPage, responseFilter);
//   }

//   @UseGuards()
//   @Get("/:responseId")
//   getOne(@Param() param) {
//     const { responseId } = param;
//     return this.responseService.getById(responseId);
//   }
// }
