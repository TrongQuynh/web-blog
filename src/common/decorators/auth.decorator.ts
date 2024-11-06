import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserIdFromToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request['user'];
    return user.id;
});

