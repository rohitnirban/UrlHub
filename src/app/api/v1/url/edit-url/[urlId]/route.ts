import { checkUrlId } from "@/helpers/checkUrlId";
import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/models/Url";


export async function PUT(
    request: Request,
    { params }: { params: { urlId: string } }
) {
    await dbConnect();

    const urlID = params.urlId;

    try {
        const { newTitle, newUrlId } = await request.json();

        if (!newTitle && !newUrlId) {
            return handleError("Please provide something to edit", 400);
        }

        const url = await UrlModel.findOne({ urlId: urlID });

        if (!url) {
            return handleError("URL not found", 404);
        }

        const isUrlIDCorrect = checkUrlId(newUrlId);

        if (!isUrlIDCorrect) {
            return handleError("Please enter correct custom back half. It only contains letters and numbers having at least 6 and at most 12 characters", 400);
        }

        if (newTitle) {
            url.title = newTitle;
        }
        if (newUrlId) {
            url.urlId = newUrlId;
            url.shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrlId}`
        }

        await url.save();

        return Response.json(
            {
                success: true,
                message: 'URL updated successfully'
            },
            {
                status: 200
            }
        )

    } catch (error:any) {
        console.error("Error editing url:", error);
        return handleError(error.message, 500);
    }
}
