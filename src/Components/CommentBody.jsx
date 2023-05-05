import React from "react";
import { CircularProgress } from "@material-ui/core";

const CommentBody = ({ comments, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-white bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : (
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0">
            <tr>
              <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                S.No.
              </th>
              <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Body
              </th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="cursor-default">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {comment.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {comment.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {comment.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {comment.body}
                </td>
              </tr>
            ))}
          </tbody>
          {/* </div> */}
        </table>
      )}
    </>
  );
};

export default CommentBody;
