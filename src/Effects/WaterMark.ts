const _watermark = (ctx: CanvasRenderingContext2D) => {
    //watermark
    ctx.save()
    ctx.fillStyle = 'rgb(200,200,200)'
    ctx.lineCap = 'butt'
    ctx.font = '12px Courier New'
    ctx.globalAlpha = 0.6
    ctx.translate(ctx.canvas.width * .72, ctx.canvas.height * .85)
    ctx.fillText('Made By Omkar Sawant', 50, 50)
    ctx.restore()
}


export default _watermark
