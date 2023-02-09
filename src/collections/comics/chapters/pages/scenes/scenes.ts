import {
    buildCollection,
    UploadedFileContext
} from "@camberi/firecms";
import { Scene } from "@/types/scenes";
import { buildPostProcessFunction, buildStoragePathFunction } from "@/utils/pathTransformers";

export const pageSceneCollection = buildCollection<Scene>({
    name: "Pages AR Scene",
    path: "scenes",
    properties: {
        ar_model_url: {
            name: "AR Model URL",
            dataType: "string",
            storage: {
                //gs://comics-77200.appspot.com/models/xDvcv256Dcd6/galeo_rev.glb
                storagePath: buildStoragePathFunction(["models", "$scenes"]),
                acceptedFiles: ["model/gltf+json", "model/gltf-binary"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: function(ctx: UploadedFileContext): string {
                    return ctx.file.name
                },
                postProcess: buildPostProcessFunction()
            }
        },
        scene_html: {
            name: "A-Frame Scene HTML",
            dataType: "string",
            validation: {
                matches: /^<a-scene[^>]*>(.|\n)*<\/a-scene>$/
            }
        }
    }
})