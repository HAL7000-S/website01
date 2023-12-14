#######
"""
扱い方メモ
0. test_maruパートファイルを用意。パスも指定
1. solidworksでツール＞マクロ＞マクロ＞新規
2. 置きたい点の座標をexcelで作り、本ファイルのdataにコピペ（したらタブ分割になるはず）
3. 出力したoutput.txtをマクロに貼り付け
4.

"""
#######

def make_VBfile(input_path, output_path):
    # 最初と最後は改行しない
    with open(input_path, 'r') as file:
        data = file.read() # 最後は改行しない

    maru_file_path = r"C:\Users\2019M12\Downloads\test_maru.SLDPRT"



    data_l = data.split("\n")

    output_code = ""
    output_code += r"""
    ' ******************************************************************************
    ' C:\Users\2019M17\AppData\Local\Temp\swx3572\Macro1.swb - macro recorded on 08/08/23 by 2019M17
    ' ******************************************************************************
    Dim swApp As Object

    Dim Part As Object
    Dim boolstatus As Boolean
    Dim longstatus As Long, longwarnings As Long

    Sub main()

    Set swApp = _
    Application.SldWorks

    Set Part = swApp.ActiveDoc
    Dim myModelView As Object
    Set myModelView = Part.ActiveView
    myModelView.FrameState = swWindowState_e.swWindowMaximized

    """


    output_code += f"""
    Dim myFeature As Object
    Set myFeature = Part.InsertPart2("{maru_file_path}", 17)
    """


    # 点の生成
    for xyz_txt in data_l[:-1]:
        xyz = xyz_txt.split("\t")
        for i in range(3):
            xyz[i] = float(xyz[i])*0.001

        # if xyz[1] < 0: # フィルタ
        VBAcode = f"""Part.ClearSelection2 True
    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0, 0, 0, True, 0, Nothing, 0)

    Part.ClearSelection2 True
    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0, 0, 0, False, 1, Nothing, 0)

    Set myFeature = Part.FeatureManager.InsertMoveCopyBody2({xyz[0]}, {xyz[1]}, {xyz[2]}, 0, {xyz[0]}, {xyz[1]}, 0, 0, 0, 0, True, 1)

    """
        output_code += VBAcode

    # 最後の点だけ処理分ける(コピーではなく移動させるため)
    xyz = data_l[-1].split("\t")
    for i in range(3):
        xyz[i] = float(xyz[i])*0.001

    output_code += f"""
    Part.ClearSelection2 True

    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0, 0, 0, True, 0, Nothing, 0)

    Part.ClearSelection2 True
    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0, 0, 0, False, 1, Nothing, 0)

    Set myFeature = Part.FeatureManager.InsertMoveCopyBody2({xyz[0]}, {xyz[1]}, {xyz[2]}, 0, {xyz[0]}, {xyz[1]}, {xyz[2]}, 0, 0, 0, False, 1)


    """

    # 結合
    output_code += """boolstatus = Part.Extension.SelectByID2("組み合わせ1", "SOLIDBODY", 0,0,0, True, 0, Nothing, 0)
    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0,0,0, True, 0, Nothing, 0)
    boolstatus = Part.Extension.SelectByID2("ﾎﾞﾃﾞｨ-移動/ｺﾋﾟｰ10", "SOLIDBODY", 0,0,0, True, 0, Nothing, 0)

    Part.ClearSelection2 True
    boolstatus = Part.Extension.SelectByID2("ﾎﾞﾃﾞｨ-移動/ｺﾋﾟｰ10", "BODYFEATURE", 0, 0, 0, False, 0, Nothing, 0)
    boolstatus = Part.Extension.SelectByID2("組み合わせ1", "SOLIDBODY", 0,0,0, True, 2, Nothing, 0)
    boolstatus = Part.Extension.SelectByID2("<test_maru>-<回転1>", "SOLIDBODY", 0,0,0, True, 2, Nothing, 0)
    boolstatus = Part.Extension.SelectByID2("ﾎﾞﾃﾞｨ-移動/ｺﾋﾟｰ10", "SOLIDBODY", 0,0,0, True, 2, Nothing, 0)
    """
    # Dim myFeature As Object
    # Set myFeature = Part.FeatureManager.InsertCombineFeature(15903?????, Nothing, Nothing)


    output_code += f"\nEnd Sub"


    # ファイルをテキストモードで開く
    with open(output_path, "w", encoding="utf-8") as file:
        # 文字列をファイルに書き込む
        file.write(output_code)

    print("out:",output_path)


if __name__ == "__main__":
    make_VBfile("./composition_app/data/xyz_tab.txt","./composition_app/data/VB.txt")