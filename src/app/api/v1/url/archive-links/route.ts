import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/models/Url";


export async function POST(
    request: Request,
) {

    await dbConnect();

    try {
        const {urlIds} = await request.json();


        if (!Array.isArray(urlIds) || urlIds.length === 0) {
            return handleError("Invalid input: linkIds must be a non-empty array.", 400)
        }

        if (!urlIds) {
            return handleError("Please provide atleast one url to edit", 400);
        }

        const urls = await UrlModel.find({ urlId: { $in: urlIds } });

        console.log(urls);

        if (urls.length === 0) {
            return handleError("No urls found with the provided ids", 404);
        }

        for (const url of urls) {
            if (url.status === "archived") {
                return handleError("One or more urls are already archived", 400);
            }
        }

        await UrlModel.updateMany(
            { urlId: { $in: urlIds } },
            { status: "archived" }
        );

        return Response.json(
            {
                success: true,
                message: 'URL archived successfully'
            },
            {
                status: 200
            }
        )

    } catch (error: any) {
        console.error("Error archiving url:", error);
        return handleError(error.message, 500);
    }
}
