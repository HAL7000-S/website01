from math import sqrt, sin, cos, pi
import numpy as np

def make_xyz(a,b,t):
    x = 80*sin(a*t + b)*sin(2*pi*t)
    y = 80*cos(a*t + b)
    z = 80*sin(a*t + b)*cos(2*pi*t)
    return (x,y,z)

def make_datafile(file_path, B_indexes):
    # 定数
    A = 0.937
    # 0.2から1.8まで、0.0125刻みでtを生成
    t_list = np.arange(0.2, 1.8, 0.0125)
    B_list = [
        False,
        0.258,
        0.321,
        0.383,
        0.446,
        0.508,
        0.571,
        0.633,
        0.696,
        0.758,
        0.821,
        0.883,
        0.946,
        1.008
    ]
    print("B_len",len(B_indexes))
    print("T_len",len(t_list))
    # ファイル初期化
    with open(file_path, "w") as file:
        pass
    output_list = []
    for i, T in enumerate(t_list):
        if len(B_indexes) == i:
            print(i)
            break
        if not B_indexes[i] == 0:
            B = B_list[B_indexes[i]]
            xyz = make_xyz(A, B, T)
            output = "\t".join(map(lambda x: "{:f}".format(x), xyz))
            output_list.append(output)
    # ファイルを開いて書き込みモードで処理
    with open(file_path, "w") as file:
        file.write("\n".join(output_list))
    print("out:",file_path)


if __name__ == "__main__":
    # 出力ファイル
    file_path = "./composition_app/data/xyz_tab.txt"

    B_indexes = [5,0,0,0,0,0,0,0, 5,0,0,0,0,0,12,0, 5,0,0,0,0,0,0,0, 5,0,0,0,8,0,0,0,
5,0,0,0,0,0,0,0, 5,0,0,0,0,0,12,0, 5,0,0,0,0,0,0,0, 8,0,0,0,5,0,0,0,
8,0,0,0,5,0,0,0, 8,0,0,0,5,0,0,0, 8,0,0,0,5,0,0,0, 10,0,0,0,12,0,0,0,
5,0,0,0,0,0,0,0, 5,0,0,0,0,0,12,0, 5,0,0,0,0,0,0,0, 5,0,0,0,8,0,0,0,]

    make_datafile(file_path, B_indexes)
