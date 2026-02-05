package com.example.springrest.domain.menu.service;

import com.example.springrest.domain.menu.model.dto.MenuRequest;
import com.example.springrest.domain.menu.model.dto.MenuResponse;
import com.example.springrest.domain.menu.model.entity.Menu;
import com.example.springrest.domain.menu.model.mapper.MenuDtoMapper;
import com.example.springrest.domain.menu.repository.MenuMapper;
import com.example.springrest.global.util.SortValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
@DisplayName("MenuService 테스트")
class MenuServiceTest {

    @Mock
    private MenuMapper menuMapper;

    @Mock
    private MenuDtoMapper menuDtoMapper;

    @Mock
    private SortValidator sortValidator;

    private MenuService menuService;

    private Menu testMenu;
    private MenuRequest testRequest;
    private MenuResponse testResponse;

    @BeforeEach
    void setUp() {
        menuService = new MenuService(menuMapper, menuDtoMapper, sortValidator);

        testMenu = Menu.builder()
                .menuId("MNU-001")
                .menuName("Test Menu")
                .price(10000L)
                .category("Beverage")
                .description("Test Description")
                .useYn("Y")
                .sysInsertDtm(LocalDateTime.now())
                .build();

        testRequest = new MenuRequest();
        testRequest.setMenuId("MNU-001");
        testRequest.setMenuName("Test Menu");
        testRequest.setPrice(10000L);
        testRequest.setCategory("Beverage");
        testRequest.setDescription("Test Description");
        testRequest.setUseYn("Y");

        testResponse = MenuResponse.builder()
                .menuId("MNU-001")
                .menuName("Test Menu")
                .price(10000L)
                .category("Beverage")
                .description("Test Description")
                .useYn("Y")
                .sysInsertDtm(LocalDateTime.now())
                .build();
    }

    @Nested
    @DisplayName("메뉴 조회")
    class GetMenus {

        @Test
        @DisplayName("ID로 메뉴 조회 성공")
        void getMenuById_Success() {
            // given
            given(menuMapper.findById("MNU-001")).willReturn(testMenu);
            given(menuDtoMapper.toResponse(any(Menu.class))).willReturn(testResponse);

            // when
            MenuResponse result = menuService.getMenuById("MNU-001");

            // then
            assertThat(result).isNotNull();
            assertThat(result.getMenuId()).isEqualTo("MNU-001");
            assertThat(result.getMenuName()).isEqualTo("Test Menu");
        }

        @Test
        @DisplayName("존재하지 않는 메뉴 조회시 null 반환 (Service에서 null 체크 안하는 경우)")
        void getMenuById_NotFound() {
            // given
            given(menuMapper.findById("invalid")).willReturn(null);
            given(menuDtoMapper.toResponse(null)).willReturn(null);

            // when
            MenuResponse result = menuService.getMenuById("invalid");

            // then
            assertThat(result).isNull();
        }
    }

    @Nested
    @DisplayName("메뉴 생성")
    class CreateMenu {

        @Test
        @DisplayName("메뉴 생성 성공")
        void createMenu_Success() {
            // given
            given(menuMapper.findById("MNU-001")).willReturn(null); // ID check
            given(menuDtoMapper.toEntity(testRequest)).willReturn(testMenu);
            given(menuMapper.insert(any(Menu.class))).willReturn(1);

            // when
            assertThatCode(() -> menuService.createMenu(testRequest))
                    .doesNotThrowAnyException();

            // then
            then(menuMapper).should().insert(any(Menu.class));
        }

        @Test
        @DisplayName("중복 ID로 생성시 예외 발생")
        void createMenu_DuplicateId() {
            // given
            given(menuMapper.findById("MNU-001")).willReturn(testMenu);

            // when & then
            assertThatThrownBy(() -> menuService.createMenu(testRequest))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("이미 존재하는 메뉴 ID");
        }
    }

    @Nested
    @DisplayName("메뉴 수정")
    class UpdateMenu {

        @Test
        @DisplayName("메뉴 수정 성공")
        void updateMenu_Success() {
            // given
            given(menuDtoMapper.toEntity(testRequest)).willReturn(testMenu);
            given(menuMapper.update(any(Menu.class))).willReturn(1);

            // when
            assertThatCode(() -> menuService.updateMenu(testRequest))
                    .doesNotThrowAnyException();

            // then
            then(menuMapper).should().update(any(Menu.class));
        }
    }

    @Nested
    @DisplayName("메뉴 삭제")
    class DeleteMenu {

        @Test
        @DisplayName("메뉴 삭제 성공")
        void deleteMenu_Success() {
            // given
            given(menuMapper.delete("MNU-001")).willReturn(1);

            // when
            assertThatCode(() -> menuService.deleteMenu("MNU-001"))
                    .doesNotThrowAnyException();

            // then
            then(menuMapper).should().delete("MNU-001");
        }
    }
}
